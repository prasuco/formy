"use client";

import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

export function AntdRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => (
    <style
      id="antd-cssinjs"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache) }}
    />
  ));

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
