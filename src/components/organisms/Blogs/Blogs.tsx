import { cardsData } from "../../../utils/data"
import PresentationCard from "../../molecules/PresentationCard/PresentationCard"

export default function Blogs() {
    return <div className='max-w-4/5 flex flex-col gap-10'>
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