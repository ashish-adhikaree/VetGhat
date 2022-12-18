import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookie } from "../../lib/parseCookies";



export function requireAuthentication(gssp : GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const { req } = context;
        const cookies = parseCookie(req);

        if (cookies.jwt == undefined) {
            // Redirect to login page
            return {
                redirect: {
                    destination: '/login',
                    statusCode: 302
                }
            };
        }

        return await gssp(context); // Continue on to call `getServerSideProps` logic
    }
}

export function dontrequireAuthentication(gssp : GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const { req } = context;
        const cookies = parseCookie(req);

        if (cookies.jwt != undefined) {
            // Redirect to login page
            return {
                redirect: {
                    destination: '/',
                    statusCode: 302
                }
            };
        }
        return await gssp(context); // Continue on to call `getServerSideProps` logic
    }
}