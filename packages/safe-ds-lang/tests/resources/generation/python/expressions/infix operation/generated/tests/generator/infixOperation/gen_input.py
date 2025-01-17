# Imports ----------------------------------------------------------------------

from tests.generator.infixOperation import cell, f, g, h, i
from typing import TypeVar

# Type variables ---------------------------------------------------------------

__gen_T = TypeVar("__gen_T")

# Utils ------------------------------------------------------------------------

def __gen_eager_or(left_operand: bool, right_operand: bool) -> bool:
    return left_operand or right_operand

def __gen_eager_and(left_operand: bool, right_operand: bool) -> bool:
    return left_operand and right_operand

def __gen_eager_elvis(left_operand: __gen_T, right_operand: __gen_T) -> __gen_T:
    return left_operand if left_operand is not None else right_operand

# Pipelines --------------------------------------------------------------------

def test():
    f(__gen_eager_or(g(), g()))
    f((cell()) | (g()))
    f((g()) | (cell()))
    f((cell()) | (cell()))
    f(__gen_eager_and(g(), g()))
    f((cell()) & (g()))
    f((g()) & (cell()))
    f((cell()) & (cell()))
    f((h()) == (h()))
    f((cell()) == (h()))
    f((h()) == (cell()))
    f((cell()) == (cell()))
    f((h()) != (h()))
    f((cell()) != (h()))
    f((h()) != (cell()))
    f((cell()) != (cell()))
    f((h()) is (h()))
    f((h()) is not (h()))
    f((h()) < (h()))
    f((cell()) < (h()))
    f((h()) < (cell()))
    f((cell()) < (cell()))
    f((h()) <= (h()))
    f((cell()) <= (h()))
    f((h()) <= (cell()))
    f((cell()) <= (cell()))
    f((h()) >= (h()))
    f((cell()) >= (h()))
    f((h()) >= (cell()))
    f((cell()) >= (cell()))
    f((h()) > (h()))
    f((cell()) > (h()))
    f((h()) > (cell()))
    f((cell()) > (cell()))
    f((h()) + (h()))
    f((cell()) + (h()))
    f((h()) + (cell()))
    f((cell()) + (cell()))
    f((h()) - (h()))
    f((cell()) - (h()))
    f((h()) - (cell()))
    f((cell()) - (cell()))
    f((h()) * (h()))
    f((cell()) * (h()))
    f((h()) * (cell()))
    f((cell()) * (cell()))
    f((h()) / (h()))
    f((cell()) / (h()))
    f((h()) / (cell()))
    f((cell()) / (cell()))
    f((h()) % (h()))
    f((cell()) % (h()))
    f((h()) % (cell()))
    f((cell()) % (cell()))
    f(__gen_eager_elvis(i(), i()))
