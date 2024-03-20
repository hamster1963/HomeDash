import { IconSemiLogo } from "@douyinfe/semi-icons";
import {
  IconBanner,
  IconList,
  IconProgress,
  IconToken,
} from "@douyinfe/semi-icons-lab";
import { Nav } from "@douyinfe/semi-ui";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

import { useSSEContext } from "@/app/home/utils/sseContext";

const routerMap: Record<string, string> = {
  home: "/home/main",
  network: "/home/xui",
  service: "/home/service",
  surge: "/home/surge",
};

function LeftSide() {
  const pathname = usePathname();
  const router = useRouter();

  const selectedKeys = useMemo(() => {
    const keys = Object.keys(routerMap);
    const selectedKey = keys.find((key) =>
      pathname.startsWith(routerMap[key] as string),
    );
    return selectedKey ? [selectedKey] : [];
  }, [pathname]);

  // 从 SSEContext 中获取侧边栏状态及其 setter 函数
  const { isNavCollapsed, setNavCollapsed } = useSSEContext();

  const toggleNav = useCallback(
    (isCollapse: boolean) => {
      setNavCollapsed(isCollapse);
    },
    [setNavCollapsed],
  );

  const navWidth = isNavCollapsed ? 60 : 220;

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
  useEffect(() => {
    router.prefetch("/home/main");
    router.prefetch("/home/xui");
    router.prefetch("/home/service");
    router.prefetch("/home/surge");
  }, [router]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}>
      <Nav
        isCollapsed={isNavCollapsed}
        onCollapseChange={(isCollapse) => toggleNav(isCollapse)}
        style={{ height: "100vh", width: navWidth }}
        footer={{ collapseButton: true }}
        onClick={(data) => {
          router.push(routerMap[data.itemKey as string]!);
        }}
        selectedKeys={selectedKeys}
      >
        <Nav.Header
          logo={<IconSemiLogo style={{ height: "36px", fontSize: 36 }} />}
          text={"Hamster's Home"}
        />
        <Nav.Item itemKey={"home"} text={"概览"} icon={<IconBanner />} />
        <Nav.Item itemKey={"service"} text={"服务监控"} icon={<IconToken />} />
        <Nav.Item itemKey={"network"} text={"用户列表"} icon={<IconList />} />
        <Nav.Item itemKey={"surge"} text={"Surge"} icon={<IconProgress />} />
      </Nav>
    </div>
  );
}

export default LeftSide;
