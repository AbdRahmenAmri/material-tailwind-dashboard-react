const Input = (props) => {
  const handleChange = (e) => {
    props.setValue(e.target.value);
  };

  return (
    <div className="relative mb-6" data-te-input-wrapper-init>
      <input
        type={props.type}
        className="placeholder:opacity-100 text-white peer block min-h-[auto] w-full rounded border-0 bg-gray-700 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none"
        id={props.id}
        placeholder={props.placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
