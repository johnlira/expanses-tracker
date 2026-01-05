import { prisma } from "../../lib/prisma";
import { CreateExpenseBody, UpdateExpenseBody } from "../../types/expenses.schemas";

interface ExpenseFilters {
  startDate?: Date;
  endDate?: Date;
  categoryId?: number;
  type?: "INCOME" | "EXPENSE";
}

interface PaginationParams {
  page: number;
  limit: number;
}

export const expensesRepository = {
  create: async (userId: number, data: CreateExpenseBody) => {
    return await prisma.expense.create({
      data: {
        userId,
        amount: data.amount,
        date: data.date,
        description: data.description,
        categoryId: data.categoryId,
        type: data.type,
        paymentMethod: data.paymentMethod,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
      },
    });
  },

  findMany: async (
    userId: number,
    filters: ExpenseFilters = {},
    pagination: PaginationParams
  ) => {
    const where: any = {
      userId,
    };

    if (filters.startDate || filters.endDate) {
      where.date = {};
      if (filters.startDate) {
        where.date.gte = filters.startDate;
      }
      if (filters.endDate) {
        where.date.lte = filters.endDate;
      }
    }

    if (filters.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters.type) {
      where.type = filters.type;
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [expenses, total] = await Promise.all([
      prisma.expense.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          category: true,
        },
        orderBy: {
          date: "desc",
        },
        skip,
        take: pagination.limit,
      }),
      prisma.expense.count({ where }),
    ]);

    return {
      expenses,
      total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(total / pagination.limit),
    };
  },

  findById: async (id: number, userId: number) => {
    return await prisma.expense.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
      },
    });
  },

  update: async (id: number, userId: number, data: UpdateExpenseBody) => {
    return await prisma.expense.update({
      where: {
        id,
      },
      data: {
        ...(data.amount !== undefined && { amount: data.amount }),
        ...(data.date !== undefined && { date: data.date }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.categoryId !== undefined ? { categoryId: data.categoryId } : {}),
        ...(data.type !== undefined && { type: data.type }),
        ...(data.paymentMethod !== undefined && { paymentMethod: data.paymentMethod }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
      },
    });
  },

  delete: async (id: number, userId: number) => {
    return await prisma.expense.delete({
      where: {
        id,
      },
    });
  },
};

