// eslint-disable-next-line react/prop-types
const PhoneInput = ({ number, setNumber }) => {
  return (
    <label className="block">
      <span className="block text-md font-semibold mb-2">Number</span>
      <input
        autoFocus
        className="py-2 px-4 border-solid border-2 border-slate-600 font-semibold text-md outline-none w-full placeholder:font-normal"
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="ex: 01234567890"
        required
      />
    </label>
  );
};

export default PhoneInput;
