import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DfamAPIService } from '../shared/dfam-api/dfam-api.service';

function preg_quote( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: preg_quote("$40");
    // *     returns 1: '\$40'
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: '\*RRRING\* Hello\?'
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

    return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, '\\$1');
}

function has_duplicates(array: any[]) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array.indexOf(array[i], i + 1) !== -1) {
      return true;
    }
  }

  return false;
}

@Component({
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  families: any = {};

  search: any = {};
  searchApiOptions: any = { };

  classOptions: any[] = [];
  cladeOptions: any[] = [];

  private classSearchTerm = new Subject<string>();
  private cladeSearchTerm = new Subject<string>();

  displayColumns = [ 'accession', 'name', 'classification', 'clades', 'description', 'length' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private dfamapi: DfamAPIService,
  ) { }

  ngOnInit() {
    this.getFamilies();

    const initialKeywords = this.route.snapshot.queryParamMap.get('keywords');
    if (initialKeywords) {
      this.search.keywords = initialKeywords;
    }

    this.classSearchTerm.pipe(debounceTime(300)).subscribe(search_term => {
      this.dfamapi.getClasses(search_term.trim()).subscribe(classes => {
        classes = classes.filter(f => f.name !== 'root');

        // Cache name variants and highlight the search term in the leaf name
        classes.forEach(c => {
          c.names = c.full_name.split(';');

          c.sort_name = c.name.toLowerCase();

          c.name_markup = c.name;
          c.name_markup = c.name_markup.replace(new RegExp(preg_quote(search_term), 'gi'), '<strong>$&</strong>');
        });

        // Add parent names until the names are unambiguous or a maximum depth is reached
        let depth = 1;
        while (depth < 5 && (depth < 2 || has_duplicates(classes.map(c => c.name_markup)))) {
          depth += 1;
          classes.forEach(c => {
            let start = c.names.length - depth;
            if (start < 0) { start = 0; }
            const parent_names = c.names.slice(start, c.names.length - 1);
            c.name_markup = parent_names.join(';') + ';' + c.name_markup;
          });
        }

        const exact = [], starts = [], contains = [];
        classes.forEach(c => {
          if (c.sort_name === search_term.toLowerCase()) {
            exact.push(c);
          } else if (c.sort_name.startsWith(search_term.toLowerCase())) {
            starts.push(c);
          } else {
            contains.push(c);
          }
        });

        function compareName(a, b) {
          if (a.sort_name < b.sort_name) {
            return -1;
          } else if (a.sort_name > b.sort_name) {
            return 1;
          } else {
            return 0;
          }
        }

        starts.sort(compareName);
        contains.sort(compareName);

        this.classOptions = exact.concat(starts).concat(contains);
      });
    });

    this.cladeSearchTerm.pipe(debounceTime(300)).subscribe(search_term => {
      this.dfamapi.getTaxa(search_term.trim()).subscribe(clades => {
        this.cladeOptions = clades.taxa.filter(f => f.name !== 'root');
        this.cladeOptions.forEach(c => {
          const markup = c.species_name.replace(new RegExp(preg_quote(search_term), 'gi'), '<strong>$&</strong>');
          c.name_markup = markup;
        });
      });
    });
  }

  displayClass(classification: any) {
    return classification ? classification.name : '';
  }

  searchChanged() {
    this.searchApiOptions.name_accession = this.search.name_accession;
    this.searchApiOptions.classification = this.search.classification ? this.search.classification.full_name : null;
    this.searchApiOptions.clade = this.search.clade;
    this.searchApiOptions.clade_ancestors = this.search.clade_ancestors;
    this.searchApiOptions.clade_descendants = this.search.clade_descendants;
    this.searchApiOptions.keywords = this.search.keywords;
    this.paginator.pageIndex = 0;
    this.getFamilies();
  }

  updateClasses() {
    const search_term = this.search.classification;

    if (search_term) {
      this.classSearchTerm.next(search_term);
    } else {
      this.classOptions = [];
      this.searchChanged();
    }
  }

  updateClades() {
    const search_term = this.search.clade;
    if (search_term) {
      this.cladeSearchTerm.next(search_term);
    } else {
      this.cladeOptions = [];
      this.searchChanged();
    }
  }

  sortChanged(sort: Sort) {
    console.log(sort);
    if (sort.direction) {
      this.searchApiOptions.sort = sort.active + ':' + sort.direction;
    } else {
      delete this.searchApiOptions.sort;
    }
    this.getFamilies();
  }

  pageChanged(event: PageEvent) {
    this.getFamilies();
  }

  getFamilies() {
    this.searchApiOptions.limit = this.paginator.pageSize;
    this.searchApiOptions.start = this.paginator.pageSize * this.paginator.pageIndex;
    this.dfamapi.getFamilies(this.searchApiOptions).subscribe((data: {}) => {
      this.families = data;
      this.families.results.forEach(function(family) {
        if (family.classification) {
          const cls = family.classification;
          family.classification_display = cls.substring(cls.lastIndexOf(';') + 1);
        }
        if (family.clades) {
          family.clades_display = family.clades.map(cl => cl.substring(cl.lastIndexOf(';') + 1)).join(', ');
          family.clades_tooltip = family.clades.join(', ');
        }
      });
    });
  }
}
