import React from "react";

interface Props {
    text: string;
    className?: string;
    charStyles?: React.CSSProperties | ((char?: string, index?: number) => React.CSSProperties);

}

const WordAnimator = ({ text, charStyles }: Props) => {
    return <div style={{ display: 'inline-block' }}>
        {text.split('').map((char, index) => {
            const style = typeof charStyles === 'function' ? charStyles(char, index) : charStyles;

            return <p
                key={`${char}-${index}`}
                style={{ display: 'inline-block', position: 'relative', ...style }}
            >
                {char}
            </p>
        })}
    </div>
}

export const TextAnimator = React.memo(({ text, charStyles = {}, className = '' }: Props) => {
    const words = text.split(' ');

    return <div className={className} data-sentence={text}>
        {words.map((word, index) => {
            return <div key={`${word}-${index}`} style={{ display: "inline-block" }} data-word={word}>
                <WordAnimator text={word} charStyles={charStyles} />
                {
                    index + 1 < words.length &&
                    <p style={{ display: "inline-block", whiteSpace: "pre-wrap" }}>
                        {" "}
                    </p>
                }
            </div>;
        })
        }
    </div>
})

// export const TextAnimator = TextAnimator);