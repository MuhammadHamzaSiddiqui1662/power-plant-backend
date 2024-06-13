export const extractRootDirPath = (path: string) => {
    const pathArray = path.split('\\');
    const pathOfRootDir = pathArray.slice(0, pathArray.indexOf("src"));
    return pathOfRootDir.join("\\")
}