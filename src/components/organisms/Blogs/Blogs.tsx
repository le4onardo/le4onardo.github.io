import { twMerge } from "tailwind-merge";
import { cardsData } from "../../../utils/data"
import PresentationCard from "../../molecules/PresentationCard/PresentationCard"

interface Props {
    className?: string;
}
export default function Blogs({ className }: Props) {
    return <div className={twMerge('tw:max-w-4/5 tw:flex tw:flex-col tw:gap-10', className)} id="blogs">
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