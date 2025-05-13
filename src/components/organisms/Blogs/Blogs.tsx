import { cardsData } from "../../../utils/data"
import PresentationCard from "../../molecules/PresentationCard/PresentationCard"

export default function Blogs() {
    return <div className='tw:max-w-4/5 tw:flex tw:flex-col tw:gap-10' id="blogs">
        {
            cardsData.map(({ title, description, writeDate, readTime }) =>
                <PresentationCard
                    key={title}
                    title={title}
                    description={description}
                    writeDate={writeDate}
                    readTime={readTime}
                    redirectTo={title.replaceAll(' ', '_')}
                    onClick={() => { console.log('test') }}
                />
            )
        }
    </div>
}