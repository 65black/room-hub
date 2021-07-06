import './Button.scss';

export default function Button({
  type = 'button',
  text,
  handleClick,
  isPrimary,
  isLink,
  extraClassNames,
}) {
  const classname = `button ${
    isPrimary ? 'button--primary' : isLink ? 'button--link' : ''
  } ${extraClassNames}`.trim();

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={classname} type={type} onClick={handleClick}>
      {text}
    </button>
  );
}
