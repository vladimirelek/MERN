const Textarea = ({
  id,
  className,
  placeholder,
  rows,
  onChange,
  required,
  name,
}) => {
  return (
    <textarea
      name={name}
      id={id}
      className={className}
      placeholder={placeholder}
      rows={rows}
      onChange={onChange}
      required={required}
    />
  );
};

export default Textarea;
