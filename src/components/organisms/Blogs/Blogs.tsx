import { cardsData } from "../../../utils/data"
import PresentationCard from "../../molecules/PresentationCard/PresentationCard"

export default function Blogs() {
    return <div className='cards-container'>
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