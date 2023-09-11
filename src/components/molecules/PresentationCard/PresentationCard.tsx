import { Link } from 'react-router-dom';
import './PresentationCard.css';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string,
    description: string,
    writeDate: Date,
    readTime: number, // minutes
    redirectTo: string
}

const PresentationCard: React.FC<Props> = ({ title, description, writeDate, readTime, redirectTo, ...props }: Props) => {
    const formatedDate = writeDate.toISOString().split('T')[0]
    const readTimeLabel = readTime + (readTime > 1 ? " mins" : " min") + " read";

    return <div className='presentation-card' {...props}>
        <Link to={`/${redirectTo}`} >
            <span className='card-title'> {title} </span>
            <p className='card-description'> {description} </p>
        </Link>
        <div className='card-info'>
            <p>{formatedDate}</p>
            <p>{readTimeLabel} </p>
        </div>
    </div>
}

export default PresentationCard;