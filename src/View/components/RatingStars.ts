import { AbstractComponent, IMovieAccountStateComponent, MovieAccountStatesProps } from "../../interfaces.js";
import MovieService from "../../services/MovieService.js";

export default class RatingStars extends AbstractComponent<undefined> implements IMovieAccountStateComponent{
    private inputs!:NodeList;
    private removeRate!: HTMLButtonElement;
    private movieId!: string;
    private session_id: string
    private apiMessage!: HTMLSpanElement;
    private id = ''

    private constructor (id: string, session_id?: string) {
        super()
        this.session_id = session_id ?? '';
        this.id = id
    }

    public static create = (id: string, session_id?: string) => {
        return new RatingStars(id, session_id)
    }

    public load = () => {
        const html = `
            <div id="rating-stars-${this.id}" class="rating-stars" class="hidden">
                <span class="remove-rate hidden"  id="remove-rate-${this.id}">
                    <span class="fa-stack">
                        <i class="fa-solid fa-star fa-stack-2x"></i>
                        <i class="fa-solid fa-slash fa-stack-2x" style="color:Tomato"></i>
                    </span>
                </span>
                <fieldset class="rate rate-${this.id}">
                    <input type="radio" id="rating10-${this.id}" name="rating-${this.id}" value="10" /><label for="rating10-${this.id}" title="5 stars"></label>
                    <input type="radio" id="rating9-${this.id}" name="rating-${this.id}" value="9" /><label class="half" for="rating9-${this.id}" title="4 1/2 stars"></label>
                    <input type="radio" id="rating8-${this.id}" name="rating-${this.id}" value="8" /><label for="rating8-${this.id}" title="4 stars"></label>
                    <input type="radio" id="rating7-${this.id}" name="rating-${this.id}" value="7" /><label class="half" for="rating7-${this.id}" title="3 1/2 stars"></label>
                    <input type="radio" id="rating6-${this.id}" name="rating-${this.id}" value="6" /><label for="rating6-${this.id}" title="3 stars"></label>
                    <input type="radio" id="rating5-${this.id}" name="rating-${this.id}" value="5" /><label class="half" for="rating5-${this.id}" title="2 1/2 stars"></label>
                    <input type="radio" id="rating4-${this.id}" name="rating-${this.id}" value="4" /><label for="rating4-${this.id}" title="2 stars"></label>
                    <input type="radio" id="rating3-${this.id}" name="rating-${this.id}" value="3" /><label class="half" for="rating3-${this.id}" title="1 1/2 stars"></label>
                    <input type="radio" id="rating2-${this.id}" name="rating-${this.id}" value="2" /><label for="rating2-${this.id}" title="1 star"></label>
                    <input type="radio" id="rating1-${this.id}" name="rating-${this.id}" value="1" /><label class="half" for="rating1-${this.id}" title="1/2 star"></label>

                </fieldset>
                
                
            </div>
            
        `
        return html
    }

    public onLoad = () => {
        this.inputs = document.querySelectorAll(`.rate-${this.id} input[type="radio"]`)!
        this.removeRate = document.getElementById(`remove-rate-${this.id}`)! as HTMLButtonElement;
        this.apiMessage = document.getElementById(`api-message-${this.id}`)! as HTMLSpanElement;


        this.removeRate.addEventListener('click', async () => {
            const resp = await MovieService.deleteRateMovie(this.movieId, this.session_id);
            if (resp && resp.status_code === 13) {
                this.setValues(this.movieId, false)
                this.apiMessage.classList.remove('hidden')
                this.apiMessage.innerText = 'Avaliação apagada com sucesso!';
                this.startCountdown();
            }
        })

        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener('click', async () => {
                const input = this.inputs[i] as HTMLInputElement
                const resp = await MovieService.rateMovie(this.movieId, this.session_id, input.value);

                if (resp && (resp.status_code === 1 || resp.status_code === 12)) {
                    this.apiMessage.classList.remove('hidden')
                    this.apiMessage.innerText = 'Avaliação salva com sucesso!';
                    this.startCountdown();
                    this.setValues(this.movieId, {value: parseInt(input.value)})
                }
                this.removeRate.classList.remove('hidden');
                
            })
        }
    }

    private startCountdown() {
        setTimeout(() => {
            this.apiMessage.classList.add('hidden');
            this.apiMessage.innerText ='';
        }, 3000)
    }

    public setValues = (movieId: string, value: boolean | {value: number}) => {
        this.movieId = movieId;
        this.apiMessage.innerText = ''
        this.apiMessage.classList.add('hidden')
        if (typeof value !== 'boolean') {
            const v = value.value
            const input = this.inputs[10-v] as HTMLInputElement
            input.checked = true
            this.removeRate.classList.remove('hidden')
        } else {
            for(let i=0; i < this.inputs.length; i++) {
                const input = this.inputs[i] as HTMLInputElement
                input.checked = false
                input.dataset.movieId = movieId
            }
            this.removeRate.classList.add('hidden')
        }

    }

}