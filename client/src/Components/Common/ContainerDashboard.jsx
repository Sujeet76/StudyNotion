const ContainerDashboard = ({ children,className }) => {
  return (
    <div className={`bg-richblack-800 border border-richblack-700 rounded-lg p-8 px-12 w-full ${className}`}>
      {children}
    </div>
  );
};

export default ContainerDashboard;
