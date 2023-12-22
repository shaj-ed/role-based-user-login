// eslint-disable-next-line react/prop-types
const TimestampInput = ({ timestamp, setTimestamp }) => {
  return (
    <label className="block">
      <span className="block text-md font-semibold mb-2">Time</span>
      <input
        autoFocus
        autoComplete="off"
        className="py-2 px-4 border-solid border-2 border-slate-600 font-semibold text-md outline-none w-full placeholder:font-normal"
        type="datetime-local"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        required
      />
    </label>
  );
};

export default TimestampInput;
