import type { Plugin } from "vite";

import { EOL } from "node:os";

import { dateUtil, readPackageJSON } from "@vh5/node-utils";

/**
 * 用于注入版权信息
 * @returns
 */

async function viteLicensePlugin(root = process.cwd()): Promise<Plugin | undefined> {
  const { description = "", homepage = "", version = "" } = await readPackageJSON(root);

  return {
    apply: "build",
    enforce: "post",
    generateBundle(_options, bundle) {
      const date = dateUtil().format("YYYY-MM-DD ");
      const copyrightText = `/*!
  * Vue H5 Template
  * Version: ${version}
  * Author: fonghehe
  * Copyright (C) 2026 fonghehe
  * License: MIT License
  * Description: ${description}
  * Date Created: ${date}
  * Homepage: ${homepage}
  * Contact: EvanFong507@outlook.com
*/
      `.trim();

      for (const [, fileContent] of Object.entries(bundle)) {
        if (fileContent.type === "chunk" && fileContent.isEntry) {
          // 插入版权信息
          const content = (fileContent as any).code as string;
          const updatedContent = `${copyrightText}${EOL}${content}`;

          // 更新bundle
          (fileContent as any).code = updatedContent;
        }
      }
    },
    name: "vite:license",
  };
}

export { viteLicensePlugin };
