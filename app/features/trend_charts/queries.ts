import { eq } from "drizzle-orm";
import client from "~/supa_clients"

export const getArticles = async ({
    start_year, 
    end_year, 
    journal, 
    subject
}: {
    start_year: number, 
    end_year: number, 
    journal?: string, 
    subject?: string
}) => {
    let query = client
        .from("all_articles")
        .select("*")
        .gte("journal_year", start_year)
        .lte("journal_year", end_year)
        .order("journal_year", { ascending: false });

    // if (journal && subject) {
    //     query = query.eq("journal_name", journal).eq("jel_code_sector2", subject);
    // }
        
    // if (journal && !subject) {
    //     query = query.eq("journal_name", journal);
    // }
    
    // if (subject && !journal) {
    //     query = query.eq("jel_code_sector2", subject);
    // }

    const { data, error } = await query;
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const getArticlesNumber = async ({
    start_year, 
    end_year,
}: {
    start_year: number, 
    end_year: number,
}) => {
    let query = client
        .from("number_of_all_articles_years")
        .select("journal_year, article_count")
        .gte("journal_year", start_year)
        .lte("journal_year", end_year)
        .order("journal_year");

    const { data, error } = await query;
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const getSubjectRatio = async ({
    category_level, 
    category_value,
}: {
    category_level: string, 
    category_value: string,
}) => {
    const { data, error } = await client
    .rpc('count_articles_by_jel_v2', {category_level, category_value});
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const getSector2Name = async({
    sector2_code,
}: {sector2_code: string}) => {
    const {data, error} = await client
        .from("jel_code")
        .select("jel_code_sector2_name")
        .eq("jel_code_sector2", sector2_code)
        .limit(1);
    
    if (error) {
        throw new Error(error.message);
    }
    return data?.[0]?.jel_code_sector2_name;
}