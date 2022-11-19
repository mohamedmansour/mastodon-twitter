import { provideFASTDesignSystem, fastButton, fastCard, fastTreeView, fastTreeItem } from "@microsoft/fast-components";

 provideFASTDesignSystem().register(
     fastButton(),
     fastCard(),
     fastTreeView(),
     fastTreeItem()
 );

export * from "./pages/home";

// document.getElementById('root')?.appendChild(document.createElement('page-home'));
