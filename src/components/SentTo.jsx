/* eslint-disable react/prop-types */
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

// eslint-disable-next-line react/prop-types
const SentTo = ({ selectUser, setSelectUser, setSelectUserDetail }) => {
  const { users, newUser } = useContext(UserContext);

  const filterUser = users
    ? users.filter((user) => user.id !== newUser.id)
    : null;

  const handleChange = (e) => {
    const selectedValue = e.target.options.selectedIndex;
    const selectedUser = JSON.parse(
      e.target.options[selectedValue].getAttribute("data-user")
    );
    setSelectUser(e.target.value);

    setSelectUserDetail(selectedUser);
  };

  return (
    <label>
      <span className="block text-md font-semibold mb-2">Send a user</span>
      <select
        className="py-2 px-4 border-solid border-2 border-slate-600 font-semibold text-md outline-none w-full capitalize cursor-pointer"
        defaultValue={selectUser}
        onChange={handleChange}
      >
        <option value="" className="capitalize text-slate-200">
          select a user
        </option>

        {filterUser.length > 0
          ? filterUser.map((user) => (
              <option
                value={user.name}
                key={user.id}
                data-user={JSON.stringify(user)}
                className="capitalize"
              >
                {user.name}
              </option>
            ))
          : null}
      </select>
    </label>
  );
};

export default SentTo;
