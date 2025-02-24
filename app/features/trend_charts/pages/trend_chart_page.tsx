import { useLoaderData, useSearchParams, useNavigate, data } from "react-router";
import { getArticles, getArticlesNumber, getSector2Name, getSubjectRatio } from "../queries";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "~/common/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { LineChart, CartesianGrid, Line, XAxis, LabelList, YAxis, Tooltip, Legend } from "recharts";
import { Badge } from "~/common/components/ui/badge";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "~/common/components/ui/scroll-area";
import { Toggle } from "~/common/components/ui/toggle";
import { ArticlesPagination } from "../components/article_pagination";
import { DotIcon } from "lucide-react";

export const loader = async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const currentYear = new Date().getFullYear();

    // URL 파라미터에서 시작년도와 종료년도를 가져옴
    const startYear = parseInt(url.searchParams.get('startYear') || String(currentYear - 9));
    const endYear = parseInt(url.searchParams.get('endYear') || String(currentYear));
    let subjects = (url.searchParams.get('subject') || "").split(',').filter(Boolean);
    if (subjects.length === 0) {
        subjects = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "Y", "Z"];
    }
    const subjectNames: { [key: string]: string } = {};
    for (const subject of subjects) {
        const name = await getSector2Name({ sector2_code: subject });
        subjectNames[subject] = name || subject;
    }

    let articles = await getArticles({ start_year: startYear, end_year: endYear });


    let subjectsRatio: any[] = [];
    for (const subject of subjects) {
        subjectsRatio.push(await getSubjectRatio({ category_level: "sector2", category_value: subject }));
    }


    const articlesNumber = await getArticlesNumber({ start_year: startYear, end_year: endYear });
    return { subjectsRatio, articles, articlesNumber, startYear, endYear, subjects, subjectNames };
};


export default function ArticlesPage() {
    const { articles, startYear, endYear, subjects, subjectNames, subjectsRatio } = useLoaderData();
    const [searchParams] = useSearchParams();
    let page = Number(searchParams.get('page')) ?? 1;
    const itemsPerPage = 20;
    if (isNaN(page) || page < 1 || page > Math.ceil(articles.length / itemsPerPage)) {
        page = 1;
    }
    const currentPage = page;

    const currentArticles = articles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    // 모든 연도를 포함하는 기본 데이터 객체 생성
    const years = Array.from(
        new Set(
            subjectsRatio.flatMap((subjectTable: any[]) =>
                subjectTable.map(item => item.journal_year)
            )
        )
    ).sort();

    // 각 연도별로 모든 subject의 ratio를 포함하는 객체 생성
    const chartData = years.map(year => {
        const dataPoint: any = { year };

        subjectsRatio.forEach((subjectTable: any[], index: number) => {
            const subject = subjects[index];
            const subjectName = subjectNames[subject];
            const item = subjectTable.find((item: any) => item.journal_year === year);
            dataPoint[subjectName] = item ? Number(item.ratio) : 0;
        });

        return dataPoint;
    });

    console.log('Chart Data:', chartData);
    console.log('Subjects Ratio:', subjectsRatio);

    const chartConfig = {
        x: {
            label: "Year",
            color: "bg-muted focus:bg-primary/80"
        },
        y: {
            label: "Ratio",
            color: "bg-muted focus:bg-primary/80"
        }
    } satisfies ChartConfig;

    const [activeSubjects, setActiveSubjects] = useState<Set<string>>(new Set(["D", "G", "J"]));

    return (

        <div className="p-4 pt-20 w-[1400px] mx-auto gap-4">
            <div className="grid grid-cols-3 gap-4 mb-6 h-[600px]">
                <Card className="col-span-2 h-[600px]">
                    <CardHeader className="grid grid-cols-2 gap-4 justify-between items-center">
                        <div>
                            <CardTitle>Ratio of Articles</CardTitle>
                            <CardDescription>from {startYear} to {endYear}</CardDescription>
                        </div>
                        {/* <Card className="grid grid-cols-3 gap-2 py-2 h-[80px] items-center justify-evenly">
                            <Badge className="text-center mx-auto h-10 py-auto w-24 bg-primary text-primary-foreground text-md">
                                Year
                            </Badge>
                            <div className="flex flex-col items-center">
                                <label className="block text-sm font-medium mb-1 text-center">From</label>
                                <select
                                    value={startYear}
                                    onChange={(e) => handleYearChange(e.target.value, String(endYear))}
                                    className="border rounded p-2"
                                >
                                    {yearOptions.map(year => (
                                        <option key={`start-${year}`} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col items-center">
                                <label className="block text-sm font-medium mb-1 text-center">To</label>
                                <select
                                    value={endYear}
                                    onChange={(e) => handleYearChange(String(startYear), e.target.value)}
                                    className="border rounded p-2"
                                >
                                    {yearOptions.map(year => (
                                        <option key={`end-${year}`} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </Card>
                        <Card className="grid grid-cols-3 gap-2 py-2 h-[80px] items-center justify-evenly">
                            <Badge className="text-center mx-auto h-10 w-24 bg-primary text-primary-foreground text-md">
                                Journal
                            </Badge>
                            <CardContent className="col-span-2 gap-2">

                                <select
                                    value={journal}
                                    onChange={(e) => handleJournalChange(e.target.value)}
                                    className="border rounded p-2"
                                >
                                    <option value="All Journal">All Journals</option>
                                    {journalOptions.map((journal) => (
                                        <option key={journal} value={journal}>
                                            {journal}
                                        </option>
                                    ))}
                                </select>

                            </CardContent>
                        </Card> */}
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="min-h-[200px] h-full w-full max-w-[1500px]">
                            <LineChart data={chartData} margin={{ top: 20, left: 12, right: 12 }}>
                                {subjectsRatio.map((_: any, index: number) => {
                                    const subject = subjects[index];
                                    const subjectName = subjectNames[subject];
                                    if (activeSubjects.has(subject)) return null;
                                    return (
                                        <Line
                                            key={`subject-line-${index}`}
                                            type="monotone"
                                            dataKey={subjectName}
                                            stroke={`hsl(var(--muted)/50)`}
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    );
                                })}
                                {subjectsRatio.map((_: any, index: number) => {
                                    const subject = subjects[index];
                                    const subjectName = subjectNames[subject];
                                    if (!activeSubjects.has(subject)) return null;
                                    return (
                                        <Line
                                            key={`subject-line-active-${index}`}
                                            type="monotone"
                                            dataKey={subjectName}
                                            stroke={`hsl(${index * 360 / subjectsRatio.length}, 70%, 50%)`}
                                            strokeWidth={2}
                                            dot={true}
                                        />
                                    );
                                })}
                                <XAxis dataKey="year" />
                                <YAxis />
                                {/* <ChartTooltip cursor={false} content={<ChartTooltipContent />} /> */}

                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                    {/* <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
            Showing total article count from {startYear} to {endYear}, in {journal} and {subjects.join(',')}
            </div>
        </CardFooter> */}
                </Card>
                <Card className="h-[600px]">
                    <CardHeader>
                        <CardTitle>Subjects</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <ScrollArea className="max-h-[500px] w-[400px]">
                            <div className="flex flex-col gap-2 w-[400px]">
                                {subjects.map((subject: string, index: number) => (
                                    <Toggle
                                        key={subject}
                                        variant="outline"
                                        className="w-full relative"
                                        pressed={activeSubjects.has(subject)}
                                        onPressedChange={(pressed) => {
                                            setActiveSubjects(prev => {
                                                const newSet = new Set(prev);
                                                if (pressed) {
                                                    newSet.add(subject);
                                                } else {
                                                    newSet.delete(subject);
                                                }
                                                return newSet;
                                            });
                                        }}
                                    >
                                        <div className="w-4 h-9 rounded-md absolute left-0" style={{ backgroundColor: `hsl(${index * 360 / subjects.length}, 70%, 50%)` }}></div>
                                        <span className="pl-6">{subjectNames[subject]}</span>
                                    </Toggle>
                                ))}
                            </div>
                            <ScrollBar forceMount={true} />
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>


            <div className="space-y-4 overflow-y-auto">
                <h2 className="text-2xl font-bold">Related Articles {activeSubjects.size > 0 ? `(${activeSubjects.size})` : ""}</h2>
                {subjects.map((subject: string) => (
                    activeSubjects.has(subject) ? (
                        <Badge key={subject} variant="outline" className="cursor-pointer">
                            {subjectNames[subject]}
                        </Badge>
                    ) : null
                ))}
                <div className="flex">

                    {articles.length === 0 ? (
                        <p>No articles found for the selected year range.</p>
                    ) : (
                        <div className="flex flex-col gap-4 items-center">
                            {currentArticles.map((article: any) => (
                                <Badge key={article.id} variant="outline" className="border p-4 rounded w-[900px] flex flex-col items-start hover:bg-primary/10">
                                    <h2 className="text-lg font-semibold text-left">{article.title}</h2>
                                    <div className="flex items-start gap-2">
                                        <p className="text-gray-600 text-left">authors</p>
                                        <DotIcon className="w-4 h-4 text-gray-600" />
                                        <p className="text-gray-600 text-left">{article.journal_name}</p>
                                        <DotIcon className="w-4 h-4 text-gray-600" />
                                        <p className="text-gray-600 text-left">{article.journal_year}</p>
                                    </div>
                                    {/* 기타 아티클 정보 표시 */}
                                </Badge>
                            ))}

                            <ArticlesPagination
                                totalItems={articles.length}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}