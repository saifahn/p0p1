export function getFrontFaceName(name: string): string {
  return name.split(' // ')[0] ?? name
}
