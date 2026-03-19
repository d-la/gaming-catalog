export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/favorites"], // whatever routes you want to protect
};

export function proxy() {

}