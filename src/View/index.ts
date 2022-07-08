import { AppProps, IComponent } from '../interfaces.js';
import LayoutHeader from './components/LayoutHeader.js'

export class View {
    private app: HTMLDivElement;
    private header: HTMLElement;
    private main: HTMLElement;
    readonly props: AppProps;

    constructor(props: AppProps) {
        this.props = props
        this.app = document.getElementById('app')! as HTMLDivElement;
        this.header = LayoutHeader(this.props);
        this.main = document.createElement('main');
        this.renderLayout();
    }

    private renderLayout = () => {
        this.app.innerHTML = '';
        this.app.appendChild(this.header);
        this.app.appendChild(this.main);
    }

    public loadPage = async (page: IComponent | undefined) => {
        if (!page) {
            return
        }
        this.main.innerHTML = '';
        this.main.innerHTML = await page.load()
        // this.main.appendChild(content)
        page.onLoad()
    }
}
