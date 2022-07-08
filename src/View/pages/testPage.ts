import { AbstractPage, AppProps } from "../../interfaces.js";

export default class TestPage extends AbstractPage {
    
    private PAGE =  {id: 'test-page', className: 'page-wrapper'}

    constructor (props: AppProps) {
        super(props)
    }

    public load = async () => {
        const html = `
            <section id="test-page" class="page-wrapper">
                <h1>Teste Page</h1>
            </section>
        `
        // const page = createElement('section', this.PAGE)
        // page.append(createElement('h1', {innerHTML: 'Test Page'}))
        return html
    }

    public onLoad = () => {
        console.log('loaded test page', this)
    }

    public static create = (props: AppProps) => {
        return new TestPage(props)
    }
}