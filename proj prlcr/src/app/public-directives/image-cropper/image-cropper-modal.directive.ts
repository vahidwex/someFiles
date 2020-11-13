import {
    Component, Input, Output,
        EventEmitter, PLATFORM_ID,
        Inject, ViewChild, ElementRef
    } from '@angular/core';
    import { Router } from "@angular/router";
    import { ImageCroppedEvent } from "ngx-image-cropper";
    
    import { AlertService } from "../../tools/alert.service";
    
    @Component({
        selector: '[app-image-cropper-modal]',
        styles: [`
            .modal-dialog { /*Because wrong style of website header*/
                margin-top: 15vh;
            }
            .opener {
                width: 100%;
                height: 100%; 
                cursor: pointer;
            }
            .opener:hover {
                width: 100%;
                height: 100%;
                filter: blur(1px)
            }
            .custom-file .custom-file-label {
                color: #240b4f;
                background: #f7f7f7;
                font-size: 1.25rem;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                border: 2px dashed #c7c7c7;
                border-radius: 24px;
            }
            .custom-file-label::after {
                display: none;
            }
            .file-input.hide {
                display: none;
            }
            .hide {
                display: none;
            }
            image-cropper {
                max-width: 100%;
            }
            .close-btn {
                display: inline-block;
                margin-left: 0;
            }
            .custom-height {
                height: 160px!important;
            }
        `],
        templateUrl: './image-cropper-modal.directive.html',
    })
    
    /**
     * This class present image cropper modal.
     */
    export class ImageCropperModalDirective {
    
        @ViewChild('addFile', { static: false }) public addFile: ElementRef;
        @ViewChild('closeModal', { static: false }) public closeModal: ElementRef;
        @ViewChild('submitBtn', { static: false }) public submitBtn: ElementRef;
        @Input() public elementId: string;
        @Input() public maxImageSize: number;
        @Input() public resizeWidth: number;
        @Input() public isRequired: boolean;
        @Output() public changes = new EventEmitter<any>();
    
        public imageChangedEvent: any = '';
        public croppedImage: any = '';
        public imageFile:any;
        public showImage: boolean = true;
    
        constructor(public router: Router,
                    private alertService: AlertService,
                    @Inject(PLATFORM_ID) private platformId: Object) {}
    
        /**
         * ngOnInit()
         */
        public ngOnInit() {}
    
        /**
         *
         */
        public renewForm() {
            this.croppedImage = '';
            this.showImage = true;
        }
    
        /**
         * This method will fire if user click to add new file.
         */
        public onSelectNewFile() {
            this.addFile.nativeElement.click();
        }
    
        /**
         * This method will fire if user submit image.
         */
        public onSubmitImageClick() {
            this.changes.emit(this.imageFile);
            this.closeModal.nativeElement.click();
            this.croppedImage = '';
            this.showImage = true;
        }
    
        /**
         * This method will pass new file to image cropper.
         *
         * @param event
         */
        public fileChangeEvent(event: any): void {
            this.imageChangedEvent = event;
            this.showImage = false;
        }
    
        /**
         * This method will receive file after cropped.
         *
         * @param {ImageCroppedEvent} event
         */
        public imageCropped(event: ImageCroppedEvent) {
            if ( !this.maxImageSize || event.file.size < this.maxImageSize ) {
                this.imageFile = event.file;
                this.croppedImage = event.base64;
                if (this.submitBtn) this.submitBtn.nativeElement.disabled = false;
            } else {
                this.croppedImage = ' ';
                if (this.submitBtn) this.submitBtn.nativeElement.disabled = true;
                this.alertService.alertError('The selected file is too large to upload.');
            }
        }
    
        /**
         * This method will give message to user if image has some error.
         */
        public loadImageFailed() {
            this.alertService.alertError('The selected file is not accepted as an image file');
        }
    }