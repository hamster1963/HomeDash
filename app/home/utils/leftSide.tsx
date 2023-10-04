"use client";
import { Nav } from "@douyinfe/semi-ui";
import {
  IconHome,
  IconSemiLogo,
  IconServer,
  IconSignal,
} from "@douyinfe/semi-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
const routerMap: Record<string, string> = {
  Home: "/home/main",
  Network: "/home/network",
  Service: "/home/service",
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
  const [isNavCollapsed, setIsNavCollapsed] = useState(() => {
    const savedState =
      typeof window !== "undefined"
        ? localStorage.getItem("navCollapsed")
        : false;
    return savedState ? JSON.parse(savedState) : false;
  });

  const toggleNav = useCallback(
    (isCollapse: boolean) => {
      setIsNavCollapsed(isCollapse);
      localStorage.setItem("navCollapsed", JSON.stringify(isCollapse));
      callbackWidth(isCollapse ? "60px" : "220px");
    },
    [callbackWidth],
  );

  // 根据导航栏的收缩状态来设置宽度
  const navWidth = isNavCollapsed ? 60 : 220;

  // 监测窗口大小变化，如果窗口宽度小于 768px，导航栏自动收缩
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        toggleNav(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggleNav]);
  // 使用useEffect监听状态更改并保存到localStorage
  useEffect(() => {
    localStorage.setItem("navCollapsed", JSON.stringify(isNavCollapsed));
    toggleNav(isNavCollapsed);
  }, [isNavCollapsed, toggleNav]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}>
      <Nav
        isCollapsed={isNavCollapsed}
        onCollapseChange={(isCollapse) => toggleNav(isCollapse)}
        className={"my-nav"}
        style={{ height: "100vh", width: navWidth }}
        renderWrapper={({ itemElement, props }) => {
          const itemKey = props.itemKey as string;
          const href = routerMap[itemKey];
          return (
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <Link style={{ textDecoration: "none" }} href={href}>
                {itemElement}
              </Link>
            </div>
          );
        }}
        footer={{
          collapseButton: true,
        }}
        items={[
          { itemKey: "Home", text: "概览", icon: <IconHome /> },
          { itemKey: "Service", text: "服务监控", icon: <IconServer /> },
          { itemKey: "Network", text: "网络状态", icon: <IconSignal /> },
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
