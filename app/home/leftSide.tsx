import { Nav } from "@douyinfe/semi-ui";
import {
  IconHistogram,
  IconHome,
  IconSemiLogo,
  IconServer,
  IconSignal,
} from "@douyinfe/semi-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
const routerMap: Record<string, string> = {
  Home: "/home/main",
  Service: "/home/service",
  Network: "/home/network",
  System: "/home/system",
};

type LeftSideProps = {
  callbackWidth: (width: string) => void;
};

function LeftSide({ callbackWidth }: LeftSideProps) {
  const pathname = usePathname();
  const selectedKeys = useMemo(() => {
    const keys = Object.keys(routerMap);
    const selectedKey = keys.find((key) => pathname.startsWith(routerMap[key]));
    return selectedKey ? [selectedKey] : [];
  }, [pathname]);

  // 添加状态来控制导航栏的收缩和展开
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const toggleNav = (isCollapse: boolean) => {
    setIsNavCollapsed(isCollapse);
    callbackWidth(isCollapse ? "60px" : "220px");
  };

  // 根据导航栏的收缩状态来设置宽度
  const navWidth = isNavCollapsed ? 60 : 220;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}>
      <Nav
        onCollapseChange={(isCollapse) => toggleNav(isCollapse)}
        className={"my-nav"}
        style={{ height: "100vh", width: navWidth }}
        renderWrapper={({ itemElement, props }) => {
          const itemKey = props.itemKey as string;
          const href = routerMap[itemKey];
          return (
            <Link
              style={{ textDecoration: "none", margin: "0 10px" }}
              href={href}
            >
              {itemElement}
            </Link>
          );
        }}
        footer={{
          collapseButton: true,
        }}
        items={[
          { itemKey: "Home", text: "概览", icon: <IconHome /> },
          { itemKey: "Network", text: "网络状态", icon: <IconSignal /> },
          { itemKey: "Service", text: "服务监控", icon: <IconHistogram /> },
          { itemKey: "System", text: "系统监测", icon: <IconServer /> },
        ]}
        defaultSelectedKeys={selectedKeys}
      >
        <Nav.Header
          logo={<IconSemiLogo style={{ height: "36px", fontSize: 36 }} />}
          text={"Hamster's Home"}
        />
      </Nav>
    </div>
  );
}

export default LeftSide;
