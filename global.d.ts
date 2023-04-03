declare module "*.css" {
  const content: { [className: string]: string }
  export = content
}
declare module "*.png" {
  const value: any
  export default value
}
declare module "*.mp4" {
  const value: any
  export default value
}
