import { AbstractComponent, IModal } from "../../interfaces.js";

export default class Modal extends AbstractComponent<undefined> implements IModal {
    private innerComponent!: string;
    private container!: HTMLElement;
    private id: string = '';
    private background!: HTMLElement;
    private content!: HTMLElement;
    private onClose: (e?: MouseEvent) => void = () => {};
    private body = document.getElementsByTagName('body')[0]
    private scroll = 0;

    constructor (innerComponent: string, id: string, onClose: (e?: MouseEvent) => void) {
        super()
        this.innerComponent = innerComponent;
        this.id = id;
        this.onClose = onClose;
        
    }

    public load = () => {
        const html = `
            <aside id="${this.id}-modal" class="modal-wrapper hidden">
                <div id="${this.id}-modal-background" class="modal-background"></div>
                <div id="${this.id}-modal-content" class="modal-content">
                    ${this.innerComponent}
                </div>
            </aside>
        `
        return html
    }

    public onLoad = () => {
        this.container = document.getElementById(`${this.id}-modal`)!
        this.background = document.getElementById(`${this.id}-modal-background`)!
        this.content = document.getElementById(`${this.id}-modal-content`)!

        this.background.addEventListener('click', this.close)
    }

    public open = (e?: MouseEvent) => {
        this.container.classList.remove('hidden')
        this.scroll = window.scrollY;
        this.body.style.top = -this.scroll +'px';
        this.lockScroll(this.body);

        if (e) {
            const x = e.clientX - this.content.clientLeft - this.content.clientWidth;
            const y = e.clientY - this.content.clientTop;
            this.content.style.top = y + 160 + this.content.clientHeight < window.innerHeight ? y + 'px' : window.innerHeight - this.content.clientHeight - 160 + 'px';
            this.content.style.left = x > 0 ? x + 'px' : 0+'px';
        }
        
    }

    public close = (e?: MouseEvent) => {
        this.container.classList.add('hidden')
        this.body.classList.remove('no-scroll');
        window.scroll(0,this.scroll)
        this.scroll=0;
        this.onClose(e)
    }

    private lockScroll = (body: HTMLElement) => {
        
        if (document.documentElement.scrollHeight > window.innerHeight) {
            body.classList.add('no-scroll');
        }
    }
}