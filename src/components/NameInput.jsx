// eslint-disable-next-line react/prop-types
const NameInput = ({ name, setName }) => {
  return (
    <label className="block">
      <span className="block text-md font-semibold mb-2">Name</span>
      <input
        autoFocus
        className="py-2 px-4 border-solid border-2 border-slate-600 font-semibold text-md outline-none w-full placeholder:font-normal"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="ex: Jhon"
        required
      />
    </label>
  );
};

export default NameInput;
