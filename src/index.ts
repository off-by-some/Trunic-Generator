export function hello(world: string = "foo"): string {
  console.log("hello", world);
  return `Hello ${world}! `;
}

hello("world");