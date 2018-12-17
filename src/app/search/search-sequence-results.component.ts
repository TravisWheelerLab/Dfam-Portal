import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DfamAPIService } from '../shared/dfam-api/dfam-api.service';

@Component({
  selector: 'dfam-search-sequence-results',
  templateUrl: './search-sequence-results.component.html',
  styleUrls: ['./search-sequence-results.component.scss']
})
export class SearchSequenceResultsComponent implements OnInit {

  loading = true;
  message: string;
  results: any;
  selectedResult: any;

  constructor(
    private dfamapi: DfamAPIService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    const id = this.route.snapshot.params.id;
    this.dfamapi.getSearchResults(id).subscribe(results => {
      if (results) {
        if (results.status === 'ERROR') {
          this.loading = false;
          this.message = results.message;
        } else if (results.message) {
          this.message = results.message;
          setTimeout(this.getResults.bind(this), 2000);
        } else {
          this.loading = false;
          this.message = null;

          results.forEach(function(result) {
            // Add 'row_id' values so the visualization can jump to the table rows
            let i = 0;
            result.hits.forEach(function(hit) {
              hit.row_id = 'annotation_' + (i++);
            });
            result.tandem_repeats.forEach(function(tr_hit) {
              tr_hit.row_id = 'annotation_' + (i++);
            });
          });

          this.results = results;
          this.selectedResult = results[0];
        }
      }
    });
  }

  getAlignment(query) {
    const id = this.route.snapshot.params.id;
    return this.dfamapi.getSearchResultAlignment(id, query.sequence, query.seq_start, query.seq_end, query.accession);
  }
}
