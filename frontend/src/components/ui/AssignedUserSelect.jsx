import Select from 'react-select';

const AssignedUserSelect = ({ users, selectedUsers, setSelectedUsers }) => {
  const options = users.map(user => ({
    value: user._id,
    label: `${user.name} (${user.title})`,
    ...user,
  }));

  return (
    <div className="w-full">
      
      <Select
        isMulti
        options={options}
        value={options.filter(option =>
          selectedUsers.some(sel => sel._id === option._id)
        )}
        onChange={(selected) => setSelectedUsers(selected)}
        className="text-sm"
      />
    </div>
  );
};

export default AssignedUserSelect;
