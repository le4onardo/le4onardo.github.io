import './PresentationCard.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string,
    description: string,
    writeDate: Date,
    readTime: number // minutes
}

const PresentationCard: React.FC<Props> = ({ title, description, writeDate, readTime, ...props }: Props) => {
    const formatedDate = writeDate.toISOString().split('T')[0]
    const readTimeLabel = readTime + (readTime > 1 ? " mins" : " min") + " read";

    return <div className='presentation-card' {...props}>
        <span className='card-title'> {title} </span>
        <p className='card-description'> {description} </p>
        <div className='card-info'>
            <p>{formatedDate}</p>

            <p>{readTimeLabel} </p>
        </div>
    </div>
}

export default PresentationCard;