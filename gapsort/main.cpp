#include <algorithm>

function upper_bound(int *begin, int *end, int *value_pos) {
    auto a = begin;
    auto b = end;

    // upper_bound
    while (a != b) {
        auto m = (a + b) >> 1;

        if (*m <= *value_pos) {
            a = m + 1;
        } else {
            b = m;
        }
    }

    return a;
}

function insertion_sort(int *begin, int *end) {
    for (auto i = begin; i < end; ++i) {
        auto pos = upper_bound(begin, i, i);
        for (auto j = i; j > pos; --j)
            iter_swap(j, j - 1);
    }
}

function expand(int* begin, int* end){
    auto n = end-begin;
    console.log(n);
    for (auto i = n; i--;){
        iter_swap(arr, begin+i, begin+i+i);
    }
}

function gapped_binary_search(int* begin, int* end, int* value_pos){
    auto n = (end - begin) >> 1;

    auto a = 0;
    auto b = n;

    // upper_bound
    while(a!=b){
        auto m = (a+b) >> 1;

        if(compare(arr,begin+m*2,value_pos) <= 0){
            a = m+1;
        }else{
            b = m;
        }
    }

    return begin + a * 2 - 1;
}

void sort(int *begin, int *end) {
    auto n = end - begin;

    auto sorted = min(32, n);
    insertion_sort(begin, begin + sorted);

    if (n <= 32)
        return;

    while (sorted + sorted <= n) {
        expand(begin, begin + sorted);
        sorted += sorted;

        auto it = begin + 1;
        auto last = end;
        while (it < begin + sorted) {

            if (*(it-1) < *it && (it == end-1 || *it < *(it+1))) {
                last = it;
                it += 2;
            } else{
                auto pos = gapped_binary_search(begin, begin + sorted, it);
                if (pos < begin)
                    pos = begin;

                if (pos == last) {
                    if (it < pos) {

                        if (*it > *pos)
                            iter_swap(it, pos);

                        auto i = pos - 1;
                        for (; i > it; i -= 2)
                            if (*(i - 1) > *i || *(i - 2) > *(i - 1))
                                break;

                        iter_swap(i - 1, it);

                        for (auto j = i - 1; j < pos - 1; ++j)
                            iter_swap(j, j + 1);

                    } else {
                        if (compare(it, pos) < 0)
                            iter_swap(it, pos);

                        auto i = pos + 1;
                        for (; i < it - 1; i += 2);

                        iter_swap(i + 1, it);

                        for (auto j = i + 1; j > pos + 1; --j)
                            iter_swap(j, j - 1);
                    }
                } else {
                    iter_swap(it, pos);
                }
                last = pos;
            }
        }
    }
}

int main () {}
