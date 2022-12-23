from io import StringIO

import numpy as np
from matplotlib import pyplot as plt


def greet(name: str):
    return f"Hello {name}, I'm Python Code from Rust PyO3!"


def chart() -> str:
    np.random.seed(0)
    arr = np.random.standard_normal((8, 100))

    plt.subplot(2, 2, 1)
    # plt.scatter(arr[0], arr[1], c=arr[1], cmap='spring')
    plt.scatter(arr[0], arr[1], c=arr[1])
    plt.spring()
    plt.title("spring")

    plt.subplot(2, 2, 2)
    plt.scatter(arr[2], arr[3], c=arr[3])
    plt.summer()
    plt.title("summer")

    plt.subplot(2, 2, 3)
    plt.scatter(arr[4], arr[5], c=arr[5])
    plt.autumn()
    plt.title("autumn")

    plt.subplot(2, 2, 4)
    plt.scatter(arr[6], arr[7], c=arr[7])
    plt.winter()
    plt.title("winter")

    plt.tight_layout()
    i = StringIO()
    plt.savefig(i, format="svg")
    return i.getvalue()
