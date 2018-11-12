import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DfamAPIService } from '../shared/dfam-api/dfam-api.service';

declare global {
  interface Window {
    dfamCoveragePlot(target: any, data: any): any;
    dfamHitProfilePlot(target: any, data: any): any;
  }
}

@Component({
  selector: 'dfam-family-model',
  templateUrl: './family-model.component.html',
  styleUrls: ['./family-model.component.scss']
})
export class FamilyModelComponent implements OnInit {

  @ViewChild('logoGraphic') private logoGraphic: ElementRef;
  @ViewChild('conservationGraph') private conservationGraph: ElementRef;
  @ViewChild('nrphCoverage') private nrphCoverage: ElementRef;
  @ViewChild('redundantCoverage') private redundantCoverage: ElementRef;
  @ViewChild('falseCoverage') private falseCoverage: ElementRef;

  family;

  constructor(
    private dfamapi: DfamAPIService,
    private route: ActivatedRoute
  ) { }

  _hmmLogo: string;
  get hmmLogo(): string {
    return this._hmmLogo;
  }
  set hmmLogo(value: string) {
    this._hmmLogo = value;
    // TODO: activate hmm_logo
  }

  assemblies = [];

  private _selectedAssembly: string;
  get selectedAssembly(): string {
    return this._selectedAssembly;
  }
  set selectedAssembly(assembly: string) {
    this._selectedAssembly = assembly;
    this.getAssemblyData(assembly);
  }
  assemblyData = {};

  thresholds: {id: string; label: string; graph: {}}[];

  private _selectedThreshold: string;
  get selectedThreshold(): string {
    return this._selectedThreshold;
  }
  set selectedThreshold(value: string) {
    this._selectedThreshold = value;
    const conservation = this.assemblyData[this.selectedAssembly].model_conservation;
    const graph_data = this.thresholds.find(t => t.id === this.selectedThreshold).graph;
    const el = this.conservationGraph.nativeElement;
    el.innerHTML = '';
    window.dfamHitProfilePlot(el, graph_data);
  }

  drawCoverageGraphs() {
    const coverage = this.assemblyData[this.selectedAssembly].model_coverage;

    const graphs = {
      'nrph': this.nrphCoverage,
      'all': this.redundantCoverage,
      'false': this.falseCoverage,
    };

    Object.keys(graphs).forEach(function(key) {
      const el = graphs[key].nativeElement;
      const data = coverage[key];
      const color_set = (key === 'false') ? undefined : 2;

      el.innerHTML = '';
      window.dfamCoveragePlot(el, { data, color_set });
    });
  }

  ngOnInit() {
    this.getFamily();
    this.getModelData();
  }

  getThresholdTitle(assembly_info: any, id: string) {
    if (id == 'GA') {
      return `Gathering ${assembly_info.hmm_hit_ga} bits`;
    } else if (id == 'TC') {
      return `Trusted ${assembly_info.hmm_hit_ga} bits`;
    } else if (['2', '4', '8', '16'].indexOf(id) !== -1) {
      return `E-value 1.0e-${id}`;
    } else {
      return id;
    }
  }

  getFamily() {
    const accession = this.route.parent.snapshot.params['id'];
    this.dfamapi.getFamily(accession).subscribe(data => {
      this.family = data;
    });
  }

  getModelData() {
    const accession = this.route.parent.snapshot.params['id'];
    this.dfamapi.getFamilyAssemblies(accession).subscribe(as => {
      this.assemblies = as;
      if (as.length) {
        this.selectedAssembly = as[0].id;
      }
    });
    this.dfamapi.getFamilyHmmLogo(accession).subscribe(l => this.hmmLogo = l);
  }

  getAssemblyData(assembly) {
    if (!this.assemblyData[assembly]) {
      const assembly_info = this.assemblies.find(a => a.id == assembly);
      this.assemblyData[assembly] = {
        hmm_fdr: assembly_info.hmm_fdr,
      };

      const accession = this.route.parent.snapshot.params['id'];
      this.dfamapi.getFamilyAssemblyModelConservation(accession, assembly).subscribe(mcons => {
        this.assemblyData[assembly].model_conservation = mcons;
        this.thresholds = [];
        mcons.forEach(mcon => {
          const label = `${this.getThresholdTitle(assembly_info, mcon.threshold)} (${mcon.num_seqs})`;

          this.thresholds.push({
            id: mcon.threshold,
            label,
            graph: {
              points: JSON.parse(mcon.graph),
              max: mcon.max_insert,
            }
          });
        });
        this.selectedThreshold = 'TC';
      });
      this.dfamapi.getFamilyAssemblyModelCoverage(accession, assembly).subscribe(mcov => {
        Object.keys(mcov).forEach(function(key) {
          mcov[key] = JSON.parse(mcov[key]);
        });
        this.assemblyData[assembly].model_coverage = mcov;
        this.drawCoverageGraphs();
      });
    } else {
      this.selectedThreshold = 'TC';
      this.drawCoverageGraphs();
    }
  }

}