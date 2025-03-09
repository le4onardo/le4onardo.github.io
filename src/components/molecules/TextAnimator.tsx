import React from "react";

interface Props {
    text: string;
    className?: string;
    charStyles?: React.CSSProperties | ((char?: string, index?: number) => React.CSSProperties);

}

export const TextAnimator = React.memo(({ text, charStyles = {}, className = '' }: Props) => {
    // console.log('text animator', text);

    return <div className={className} data-sentence={text}>
        {text.split(' ').map((word, index) => {
            const chars = word.split('').map(char => {
                const style = typeof charStyles === 'function' ? charStyles(char, index) : charStyles;

                return <p style={{ display: 'inline-block', position: 'relative', ...style }}>{char}</p>
            });
            return [
                index > 0 ? <p style={{ display: "inline-block", whiteSpace: "pre-wrap" }}>{" "}</p> : null,
                <div style={{ display: "inline-block" }} data-word={word}> {chars}</div>
            ];
        }).flat()
        }
    </div>
})

// export const TextAnimator = TextAnimator);