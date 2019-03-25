import re
from tabula import read_pdf

""" My thought process of solving this problem.
    First, we have to lay out the limitations.
    1. We have 300 Crowns
    2. We each type of armor, and also an extra piece.
    The intuition is that we have to optain the lowest price
    of each piece of armor, then spend the remaining money on
    an extra piece
    If we wanted to optimize this, we can firstly fulfil our base solution,
    which is we pick the cheapest of each piece, plus the cheapest of 
    the extra piece.
    Then , we can find the next more expensive piece out of the 6 pieces of
    armor we have.
    For example, assuming we have 10 crowns left. We can refund (kind of,
    but we haven't finalize at this point.) We have a piece of armor that 
    costs 50 crowns, and there's another piece of the same type that is 
    51 crowns, we will swap to that and then now we have 10 crowns left.
    We repeat this until we have the least amount of crowns possible left.
"""
def compare_cost(e):
    """ Sorting function specifically to compare the cost of armor """
    return float(e[3])

def main():
    # Read pdf and parse the information
    inv = read_pdf('inv.pdf', encoding="utf-8", spreadsheet=True, pages="1-2")
    table = list(str(inv))
    clean_table = [e for e in table if e != " "]
    crowns = 300
    index = 0
    armorset = { "Helmet": "", "Chest": "", "Boots": "", "Leggings": "" }
    # We use regex to extract the necessary info into different groups
    # Group 1 = row number
    # Group 2 = Type
    # Group 3 = Name
    # Group 4 = Cost
    # Group 5 = Armor value
    reg = re.findall(r"(\d+)(Helmet|Leggings|Chest|Boots)(\D+)(\d{1,3}\.0)(\d{1,3}\.0)", "".join(clean_table))
    # Sort them in cost
    reg.sort(key=compare_cost)
    # Separate them to different type
    helmets = [h for h in reg if h[1] == "Helmet"]
    chests = [c for c in reg if c[1] == "Chest"]
    leggings = [l for l in reg if l[1] == "Leggings"]
    boots = [b for b in reg if b[1] == "Boots"]
    # Get all the cheapest and see how much crowns we have left
    crowns -= (float(helmets[index][3]) + float(chests[index][3]) + float(leggings[index][3]) + float(boots[index][3]))
    armorset['Helmet'] = helmets[index][2]
    armorset['Chest'] = chests[index][2]
    armorset['Leggings'] = leggings[index][2]
    armorset['Boots'] = boots[index][2]
    index += 1
    print("After buying all the cheapest pieces, we have " + str(crowns) + " left.")
    # Now we need an extra piece
    next_lowest = min(float(helmets[index][3]), float(chests[index][3]), float(leggings[index][3]), float(boots[index][3]))
    crowns -= next_lowest
    print("Now we have " + str(crowns) + " crowns left.")
    #while (not (found_helmet and found_chest and found_leggings and found_boots))
    # Now we can slowly upgrade each part of our armors
    while True:
        h = float(helmets[index][3]) or None
        c = float(chests[index][3]) or None
        l = float(leggings[index][3]) or None
        b = float(boots[index][3]) or None
        next_lowest = min(h,c,l,b)
        if next_lowest > crowns:
            # Could not buy anymore
            break
        # Check which piece we got, get the name of it, update
        # our armorset
        if h == next_lowest:
            armorset['Helmet'] = helmets[index][2]
        elif c == next_lowest:
            armorset['Chest'] = chests[index][2]
        elif l == next_lowest:
            armorset['Leggings'] = leggings[index][2]
        else:
            armorset['Boots'] = boots[index][2]
        crowns -= next_lowest
        index += 1
    print('Now we have ' + str(crowns) + " crowns left.")
    print("Our final set is " + str(armorset))

main()
