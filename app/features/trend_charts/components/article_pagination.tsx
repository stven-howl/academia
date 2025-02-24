import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from "app/common/components/ui/pagination";
import { useSearchParams } from "react-router";

interface ArticlesPaginationProps {
  totalItems: number;
}

export function ArticlesPagination({
  totalItems
}: ArticlesPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  let page = Number(searchParams.get("page")) ?? 1;
  if (isNaN(page) || page < 1 || page > Math.ceil(totalItems / 20)) {
    page = 1;
  }
  const totalPages = Math.ceil(totalItems / 20);
  const onClick = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {page === 1 ? null : (
            <>
              <PaginationItem>
                <PaginationPrevious
                  to={`?page=${page - 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page - 1);
                  }}
                  size="default"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  to={`?page=${page - 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page - 1);
                  }}
                  size="default"
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink
              to={`?page=${page}`}
              onClick={(event) => {
                event.preventDefault();
                onClick(page);
              }}
              isActive
              size="default"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
          {page === totalPages ? null : (
            <>
              <PaginationItem>
                <PaginationLink
                  to={`?page=${page + 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page + 1);
                  }}
                  size="default"
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              {page + 1 === totalPages ? null : (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  to={`?page=${page + 1}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onClick(page + 1);
                  }}
                  size="default"
                />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}