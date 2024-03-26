import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { AssetService } from '../asset.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit, OnChanges {
  allassets: any
  alldata: any
  @Input() categoryid: string = '';
  @Input() model: string = '';
  @Input() manufacturer: string = '';
  @Input() status: string = '';
  @Input() auditstatus: string = '';
  @Input() assignment: string = '';
  @Input() assignedto: string = '';
  @Input() date: string = '';
  loading = true
  constructor(private assetservice: AssetService, private toastservice: ToasterService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {

    this.loadAssets()
    //checking mode of operation of page
    if (this.assetservice.getMode() == "assettouser") {
      this.assetservice.setSelAssetId(0)
      this.assetservice.setMode("default")

    }

  }
  loadAssets() {
    this.loading = true
    this.assetservice.assetSearch(this.categoryid, this.model, this.manufacturer, this.status, this.auditstatus, this.assignment, this.assignedto, this.date).subscribe((data) => {
      this.alldata = data
      this.allassets = this.alldata.assets
      this.loading = false
    },
      error => {
        console.log(error);
        this.loading = false
      });

  }

  goToEditPage(id: number) {
    this.router.navigate(['dashboard/assets/edit/' + id]);

  }

  deleteAsset(id: number) {
    this.assetservice.deleteAsset(id).subscribe(() => {
      console.log("Delete success")
      this.loadAssets()
      this.toastservice.showSuccess("Record deleted " + id)


    },
      error => {
        console.log(error);
      });

  }
  confirmDeleteModal(content: any) {
    this.modalService.open(content, { centered: true });

  }
  contAssignToUser(id: number) {
    this.assetservice.setSelAssetId(id)
    this.assetservice.setMode("assettouser")
    this.router.navigate(['/dashboard/user'])
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadAssets()
  }
}
