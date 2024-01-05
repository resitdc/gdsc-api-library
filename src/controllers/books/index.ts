import { Request, Response } from "express";
import MMasterBooks from "@models/MasterBooks.model";
import { paginationResponse, successResponse, errorResponse } from "@utils/response";
import { generateId } from "@utils/helpers";
import { raw } from "objection";

export const listData = async (req: Request, res: Response) => {
  const limit: number = Number(req.query.limit) || 10;
  const page: number = Number(req.query.page) || 1;
  const searchKeywords: string | null = req.query?.s ? String(req.query.s)?.toLowerCase() : null;

  try {
    const { total, results } = await MMasterBooks.querySoftDelete()
      .select(
        "master_books.id",
        "master_books.title",
        "master_books.writer",
        "master_books.publisher",
        "master_books.publication_year as publicationYear",
        "master_books.genre",
        "master_books.cover",
        raw("COUNT(books.master_book_id)").as("stock")  
      )
      .leftJoin("books", "books.master_book_id", "master_books.id")
      .groupBy("master_books.id")
      .groupBy("books.master_book_id")
      .page(page - 1, limit)
      .modify((queryBuilder) => {
        if (searchKeywords !== null && searchKeywords !== "") {
          queryBuilder.whereRaw("LOWER(master_books.title) LIKE ?", [`%${searchKeywords}%`]);
          queryBuilder.orWhereRaw("LOWER(master_books.writer) LIKE ?", [`%${searchKeywords}%`]);
          queryBuilder.orWhereRaw("LOWER(master_books.publisher) LIKE ?", [`%${searchKeywords}%`]);
          queryBuilder.orWhereRaw("LOWER(master_books.publication_year) LIKE ?", [`%${searchKeywords}%`]);
          queryBuilder.orWhereRaw("LOWER(master_books.genre) LIKE ?", [`%${searchKeywords}%`]);
        }
      });

    let totalData = total;
    res.status(200).json(
      successResponse("SUCCESS", {
        results: {
          pagination: paginationResponse(page, limit, totalData),
          data: results
        }
      })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(
        errorResponse(error?.message, { results: null })
      );
    } else {
      res.status(500).json(
        errorResponse("Internal server error", { results: null })
      );
    }
  }
};

export const detailData = async (req: Request, res: Response) => {
  const masterBookId = req.params.id;
  try {
    const masterBook = await MMasterBooks.querySoftDelete()
      .select(
        "master_books.id",
        "master_books.title",
        "master_books.writer",
        "master_books.publisher",
        "master_books.publication_year as publicationYear",
        "master_books.genre",
        "master_books.description",
        "master_books.cover",
        "master_books.is_publish as isPublish",
        "master_books.created_at as createdAt",
        "master_books.updated_at as updatedAt",
        raw("COUNT(books.master_book_id)").as("stock")
      )
      .leftJoin("books", "books.master_book_id", "master_books.id")
      .groupBy("books.master_book_id")
      .findById(masterBookId);

    if (masterBook) {
      res.status(200).json(
        successResponse("SUCCESS", { results: masterBook })
      );
    } else {
      res.status(404).json(
        errorResponse("DATA NOT FOUND", { results: null })
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(
        errorResponse(error?.message, { results: null })
      );
    } else {
      res.status(500).json(
        errorResponse("Internal server error", { results: null })
      );
    }
  }
};

export const deleteData = async (req: Request, res: Response) => {
  const masaterBookId = req.params.id;
  try {
    await MMasterBooks.softDelete(masaterBookId);

    res.status(200).json(
      successResponse("Deleted", { results: null })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json(
        errorResponse(error?.message, { results: null })
      );
    } else {
      res.status(500).json(
        errorResponse("Internal server error", { results: null })
      );
    }
  }
};
