import { Category } from "../../models/index.js";
import CustomErrorHandler from "../../services/customErrorHandler.js";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// create Category handler
const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return next(
        CustomErrorHandler.badRequest("Name and Description is required !")
      );
    }

    const categoryDetail = await Category.create({
      categoryName: name,
      description,
    });
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// fetch all Category
const showAllCategory = async (req, res, next) => {
  try {
    const CategoryData = await Category.find(
      {},
      { categoryName: true, description: true }
    );

    if (!CategoryData) {
      return next(CustomErrorHandler.notFound("No category found!!"));
    }

    res.status(200).json({
      success: true,
      message: "Category fetch successfully",
      CategoryData: CategoryData,
    });
  } catch (error) {
    return next(error);
  }
};

// Category Page details
const categoryPageDetails = async (req, res, next) => {
  try {
    const { categoryId } = req.body;
    // get details from selected category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReview",
      })
      .exec();
    // Handel the case when the category not found
    if (!selectedCategory) {
      console.log("Category not found");
      return next(CustomErrorHandler.badRequest("Category data not found!!"));
    }
    //no course
    if (selectedCategory.length === 0) {
      console.log("No course found");
      return next(
        CustomErrorHandler.badRequest("No course found from selected category")
      );
    }

    const selectedCourse = selectedCategory.course;

    // get courses from other categories
    const categoryExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });
    let differentCourse = await Category.findOne(
      categoryExceptSelected[getRandomInt(categoryExceptSelected.length)]
    )
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReview",
      })
      .exec();

    // get top course
    const allCategory = await Category.find().populate({
      path: "course",
      match: { status: "Published" },
      populate: {
        path: "ratingAndReview",
      },
    });
    const allCourse = allCategory.flatMap((category) => category.course);
    const mostSellingCourse = allCourse
      .sort((a, b) => {
        const criteriaA = a.sold * a.ratingAndReview.rating;
        const criteriaB = b.sold * b.ratingAndReview.rating;
        return criteriaB - criteriaA;
      })
      .slice(0, 10);

    return res.status(200).json({
      selectedCategory,
      differentCourse,
      mostSellingCourse,
    });
  } catch (error) {
    return next(error);
  }
};

export { createCategory, showAllCategory, categoryPageDetails };
