import { message } from "antd";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRouter = ({ children }: { children: ReactNode }) => {
  const user = localStorage.getItem("user");
  const { id } = JSON.parse(user || "{}");

  const navigate = useNavigate();
  if (id != 1) {
    message.error("Bạn không đủ quyền truy cập");
    navigate("/login");
  }

  return id != 1 ? <></> : children;
};

export default PrivateRouter;
