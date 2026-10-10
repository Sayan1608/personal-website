type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  number: string;
  titleId: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  number,
  titleId
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow"><span className="eyebrow-dot" /> {eyebrow}</span>
        <h2 className="section-title" id={titleId}>{title}</h2>
      </div>
      <div className="section-heading-aside">
        {description && <p>{description}</p>}
        <span className="section-index">{number} / 06</span>
      </div>
    </div>
  );
}
