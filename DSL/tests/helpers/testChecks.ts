import {Range} from 'vscode-languageserver';
import {findTestComments} from './testComments';
import {findTestRanges, FindTestRangesError} from './testRanges';
import {Result} from 'true-myth';

/**
 * Finds all test checks, i.e. test comments and their corresponding test ranges.
 *
 * @param program The program with test comments and test markers.
 * @param options Options for the function.
 */
export const findTestChecks = (
    program: string,
    options: FindTestChecksOptions = {},
): Result<TestCheck[], FindTestChecksError> => {
    const {
        failIfNoComments = false,
        failIfFewerRangesThanComments = false
    } = options;

    const comments = findTestComments(program);
    const ranges = findTestRanges(program);

    // Opening and closing test markers must match
    if (ranges.isErr) {
        return Result.err(ranges.error);
    }

    // Must never contain more ranges than comments
    if (ranges.value.length > comments.length) {
        return Result.err(new MoreRangesThanCommentsError(comments, ranges.value));
    }

    // Must contain at least one comment, if corresponding check is enabled
    if (failIfNoComments && comments.length === 0) {
        return Result.err(new NoCommentsError());
    }

    // Must not contain fewer ranges than comments, if corresponding check is enabled
    if (failIfFewerRangesThanComments && ranges.value.length < comments.length) {
        return Result.err(new FewerRangesThanCommentsError(comments, ranges.value));
    }

    return Result.ok(comments.map((comment, index) => ({comment, range: ranges.value[index]})));
};

/**
 * Options for the `findTestChecks` function.
 */
export interface FindTestChecksOptions {
    /**
     * If this option is set to `true`, an error is returned if there are no comments.
     */
    failIfNoComments?: boolean;

    /**
     * It is never permissible to have *more* ranges than comments. If this option is set to `true`, the number of
     * ranges must be *equal to* the number of comments.
     */
    failIfFewerRangesThanComments?: boolean;
}

/**
 * A test check, i.e. a test comment and its corresponding test range. The range is optional. If it is omitted, the test
 * comment is associated with the whole program.
 */
export interface TestCheck {
    comment: string;
    range?: Range;
}

/**
 * Something went wrong while finding test checks.
 */
export type FindTestChecksError =
    | NoCommentsError
    | MoreRangesThanCommentsError
    | FewerRangesThanCommentsError
    | FindTestRangesError;

/**
 * Did not find any test comments.
 */
export class NoCommentsError extends Error {
    constructor() {
        super('No test comments found.');
    }
}

/**
 * Found more test ranges than test comments.
 */
export class MoreRangesThanCommentsError extends Error {
    constructor(readonly comments: string[], readonly ranges: Range[]) {
        super(`Found more test ranges (${ranges.length}) than test comments (${comments.length}).`);
    }
}

/**
 * Found fewer test ranges than test comments.
 */
export class FewerRangesThanCommentsError extends Error {
    constructor(readonly comments: string[], readonly ranges: Range[]) {
        super(`Found fewer test ranges (${ranges.length}) than test comments (${comments.length}).`);
    }
}
