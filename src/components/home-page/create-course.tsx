function CreateCourse() {
  return (
    <div className="relative lg:px-10 px-5 h-full pt-5">
      <AccountsTable
        tableHead={userAccountTableHead}
        showData={showData}
        setShowData={setShowData}
        isDataLoading={isDataLoading}
      />
    </div>
  );
}

export default CreateCourse;
