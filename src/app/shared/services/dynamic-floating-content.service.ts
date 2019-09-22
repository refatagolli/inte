import {ElementRef, Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {RElement} from '@angular/core/src/render3/interfaces/renderer';

@Injectable({
  providedIn: 'root'
})
export class DynamicFloatingContentService {
  private _backdrop: HTMLElement;
  private _renderer: Renderer2;

  constructor(@Inject(DOCUMENT) private document: Document,
              private _rendererF: RendererFactory2) {
    this._renderer = this._rendererF.createRenderer(null, null);
  }


  public create(child: ElementRef, trigger: ElementRef) {
    this._backdrop = this.document.createElement('div');

    this._backdrop.classList.add('fuse-sidebar-overlay');

    this._backdrop.classList.add('fuse-sidebar-overlay-invisible');
    this._backdrop.classList.add('test');
    this._backdrop.addEventListener('click', () => {console.log('hahahahahaha')});

    this.document.body.appendChild(this._backdrop);
    this.document.body.appendChild(child.nativeElement);
    console.log(child.nativeElement)

  }


}
