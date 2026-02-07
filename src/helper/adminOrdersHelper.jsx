export const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export const PaymentBadge = ({ method }) => {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        method === "COD"
          ? "bg-gray-100 text-gray-700"
          : "bg-blue-100 text-blue-700"
      }`}
    >
      {method}
    </span>
  );
};
